
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '@/contexts/SocketContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { sanitizeUsername } from '@/utils/profanityFilter';
import { toast } from 'sonner';

const Join = () => {
  const { setRoomId, setUserName, setIsTeacher } = useSocket();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Por favor, digite seu nome');
      return;
    }
    
    if (!room.trim()) {
      toast.error('Por favor, digite o código da sala');
      return;
    }
    
    // Sanitize username to filter profanity
    const sanitizedName = sanitizeUsername(name);
    if (sanitizedName !== name) {
      toast.warning('Seu nome foi modificado para seguir nossas diretrizes');
    }
    
    // Set context values
    setUserName(sanitizedName);
    setRoomId(room.toUpperCase());
    setIsTeacher(isTeacherMode);
    
    // In a real app, here we would attempt to join the room via socket.io
    // and navigate only on successful connection
    
    // Navigate to appropriate game view
    if (isTeacherMode) {
      navigate('/teacher-game');
      toast.success(`Sala ${room.toUpperCase()} criada com sucesso!`);
    } else {
      navigate('/student-game');
      toast.success(`Entrou na sala ${room.toUpperCase()}`);
    }
  };

  const generateRoomCode = () => {
    // Generate a random 6-character room code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRoom(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800">QuizQuímica</h1>
          <p className="text-gray-600 mt-2">Aprenda os símbolos dos elementos químicos</p>
        </div>
        
        {/* Join Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleJoinGame}>
            <div className="space-y-5">
              <div>
                <Label htmlFor="name">Seu nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={20}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="room">{isCreatingRoom ? 'Criar sala' : 'Código da sala'}</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="room"
                    type="text"
                    placeholder={isCreatingRoom ? "Gerando código..." : "Digite o código da sala"}
                    value={room}
                    onChange={(e) => setRoom(e.target.value.toUpperCase())}
                    className="flex-1"
                    maxLength={6}
                  />
                  {isCreatingRoom && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateRoomCode}
                    >
                      Gerar
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="teacher-mode"
                    checked={isTeacherMode}
                    onCheckedChange={(checked) => {
                      setIsTeacherMode(checked);
                      setIsCreatingRoom(checked);
                      if (checked) {
                        generateRoomCode();
                      } else {
                        setRoom('');
                      }
                    }}
                  />
                  <Label htmlFor="teacher-mode">Modo Professor</Label>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg"
                >
                  {isTeacherMode ? 'Criar Sala' : 'Entrar'}
                </Button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Instructions */}
        <div className="mt-6 bg-white bg-opacity-50 rounded-lg p-4 text-sm text-gray-600">
          {isTeacherMode ? (
            <p>
              No modo professor, você criará uma sala e poderá selecionar quais famílias 
              de elementos químicos incluir no quiz.
            </p>
          ) : (
            <p>
              Peça ao seu professor o código da sala para participar do quiz sobre 
              elementos químicos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Join;
