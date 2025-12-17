'use client';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

interface Mensaje {
  from: 'user' | 'ai';
  text: string;
}

export default function ChatFlotante() {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [cargando, setCargando] = useState(false);
  const mensajesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    mensajesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

const enviarMensaje = async () => {
  if (!input.trim() || cargando) return;

    //Añadimos el mensaje del usuario al estado local
  const nuevoMensajeUsuario: Mensaje = { from: 'user', text: input };
  const historialActualizado = [...mensajes, nuevoMensajeUsuario];
    
    setMensajes(historialActualizado);
    setInput('');
    setCargando(true);

    try {
      //Enviamos TODO el historial (historialActualizado) a Laravel
      const response = await axios.post('/api/asistente/chat', { 
        mensajes: historialActualizado 
      });

      const respuestaIA: Mensaje = { 
        from: 'ai', 
        text: response.data.respuesta 
      };
      setMensajes(prev => [...prev, respuestaIA]);

    } catch (error) {
        const errorMsg: Mensaje = { 
        from: 'ai', 
        text: 'Lag mental... (Error del servidor)' 
      };
      setMensajes(prev => [...prev, errorMsg]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setVisible(!visible)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 w-16 h-16 flex items-center justify-center text-xl animate-bounce-slow"
        title="Chat con GameBot 🤖"
      >
        💬
      </button>

      {/* Chat superpuesto */}
      {visible && (
        <div className="fixed bottom-28 right-6 z-50 w-80 sm:w-96 h-96 bg-white/95 backdrop-blur-md border-2 border-teal-200 rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-bold">GameBot</h3>
                <p className="text-xs opacity-90">Tu asistente de juegos</p>
              </div>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-white hover:text-white/80 transition"
            >
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3">
            {mensajes.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  🎮
                </div>
                <p>¡Hola! Soy GameBot. Puedo ayudarte con recomendaciones de juegos, géneros, o info sobre títulos específicos.</p>
                <p className="text-sm mt-1">Ej: "¿Qué juegos de acción me recomiendas?"</p>
              </div>
            )}
            {mensajes.map((mensaje, index) => (
              <div
                key={index}
                className={`flex ${mensaje.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    mensaje.from === 'user'
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <ReactMarkdown>
                    {mensaje.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {cargando && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-2xl text-gray-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={mensajesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white/50 rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), enviarMensaje())}
                className="text-gray-900 flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                placeholder="Dispara renacuajo ..."
                disabled={cargando}
              />
              <button
                onClick={enviarMensaje}
                disabled={!input.trim() || cargando}
                className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 flex items-center"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
