import * as React from "react";
import Image from "next/image";
import { FileText, Folder, FileSignature, MessageCircle, Lightbulb } from "lucide-react";
import { Textarea } from "./textarea";
import { Badge } from "./badge";

export function ChatIntranet({ className }: { className?: string } = {}) {
  const [messages, setMessages] = React.useState<{role: 'user' | 'assistant', text: string, image?: string}[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Agrega mensaje de usuario
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInputValue("");
    setIsTyping(true);

    // Simula respuesta de la IA
    setTimeout(() => {
      setIsTyping(false);
      
      const respuestasVariadas = [
        `He revisado tu consulta sobre "${text}". Según nuestros documentos, la información está actualizada en el sistema. ¿Te ayudo con algo más específico?`,
        `¡Excelente pregunta! Referente a "${text}", nuestras políticas indican que todo está en orden. ¿Necesitas que abra el archivo completo?`,
        `Analizando tu petición de "${text}"... Te confirmo que puedes encontrar los formatos relacionados directamente en tu panel de descargas.`,
        `Entendido. He procesado la información sobre "${text}". Todo cuadra perfectamente con las normativas actuales de la intranet.`
      ];
      
      const respuestaAleatoria = respuestasVariadas[Math.floor(Math.random() * respuestasVariadas.length)];
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: respuestaAleatoria
      }]);
    }, 1500);
  };

  return (
    <div className={`flex flex-col bg-background rounded-xl border border-border shadow-md overflow-hidden w-full h-full min-h-[600px] ${className || ""}`}>
      
      {/* Premium Header */}
      <div className="px-6 py-4 relative bg-zinc-900 flex items-center justify-between sticky top-0 z-20 shadow-md">
        {/* Gradient Border Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-primary/60 via-info/40 to-transparent"></div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground text-sm tracking-wide">Pregúntale a la IA</h3>
            {/* Animated Online Dot */}
            <span className="relative flex h-2 w-2 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Avatar IA moved to the right */}
          <div className="flex size-10 items-center justify-center rounded-full border border-primary/60 shadow-md shrink-0 bg-[#1c1c24] overflow-hidden ring-2 ring-primary/20">
            <Image 
              src="/perfil ia.png" 
              alt="GloAI" 
              width={40} 
              height={40} 
              className="object-cover scale-110"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 p-4 sm:p-6 flex flex-col relative ${messages.length > 0 ? "overflow-y-auto scrollbar-thin" : "overflow-hidden"}`}>
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Top Graphic Section: Mascot + Floating Docs */}
            <div className="relative w-full max-w-sm flex items-center justify-center mb-2 sm:mb-8 mt-0">
              
              {/* Floating Elements Scoped to Image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute -left-4 top-4 animate-in slide-in-from-bottom-8 duration-700 delay-100">
                  <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl shadow-lg shadow-primary/5 border border-border rotate-[-12deg]">
                    <FileText className="size-5 text-primary/70" />
                  </div>
                </div>
                
                <div className="absolute -right-2 top-0 animate-in slide-in-from-bottom-8 duration-700 delay-300">
                  <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg shadow-lg shadow-info/5 border border-border rotate-[15deg]">
                    <Folder className="size-5 text-info/70" />
                  </div>
                </div>

                <div className="absolute right-4 bottom-4 animate-in slide-in-from-bottom-8 duration-700 delay-500">
                  <div className="p-1.5 bg-white dark:bg-zinc-900 rounded-md shadow-lg shadow-warning/5 border border-border rotate-[-8deg]">
                    <FileSignature className="size-4 text-warning/70" />
                  </div>
                </div>
              </div>

              {/* Mascot Image */}
              <div className="w-24 h-24 sm:w-44 sm:h-44 relative z-10 animate-in zoom-in-95 duration-700">
                <Image
                  src="/GlocIA.png"
                  alt="GlocIA Mascot"
                  width={176}
                  height={176}
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-center space-y-2 sm:space-y-3 relative z-10 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                Hola 👋, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-info">GloAI</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Veo que has seleccionado un documento de la tabla. Hazme una pregunta sobre él.
              </p>
              
              {/* Features Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3 sm:pt-6 mt-1 sm:mt-4 border-t border-border/40 w-full px-1 sm:px-4">
                <Badge variant="secondary" className="px-3 py-1.5 flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 border-none font-semibold text-[10px] uppercase tracking-wider shadow-sm rounded-full whitespace-nowrap">
                  <MessageCircle className="size-3.5 shrink-0" />
                  <span>Responde tus preguntas</span>
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5 flex items-center gap-1.5 bg-info/10 text-info hover:bg-info/20 border-none font-semibold text-[10px] uppercase tracking-wider shadow-sm rounded-full whitespace-nowrap">
                  <FileText className="size-3.5 shrink-0" />
                  <span>Resume y analiza</span>
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5 flex items-center gap-1.5 bg-warning/10 text-warning hover:bg-warning/20 border-none font-semibold text-[10px] uppercase tracking-wider shadow-sm rounded-full whitespace-nowrap">
                  <Lightbulb className="size-3.5 shrink-0" />
                  <span>Extrae lo importante</span>
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 flex-1 w-full pb-4">
            {messages.map((msg, i) => (
              msg.role === 'assistant' ? (
                <div key={i} className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/20 shadow-sm overflow-hidden bg-surface">
                    <Image src="/chat.png" alt="IA" width={48} height={48} className="object-cover w-full h-full" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-surface border border-border/40 p-4 text-sm text-foreground shadow-sm leading-relaxed">
                    {msg.text && msg.text.split('\n').map((line, j) => (
                      <React.Fragment key={j}>
                        {line}
                        {j < msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex flex-col items-end gap-1 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-zinc-800/90 border border-white/10 text-white p-4 text-sm shadow-md leading-relaxed backdrop-blur-md">
                    {msg.text}
                  </div>
                </div>
              )
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 shadow-sm overflow-hidden bg-surface animate-pulse ring-4 ring-primary/10">
                  <Image src="/chat.png" alt="IA" width={48} height={48} className="object-cover w-full h-full" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-surface border border-border/40 px-4 py-3 shadow-sm flex items-center gap-1.5 h-10">
                  <div className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer / Input Area */}
      <div className="p-3 sm:p-6 border-t border-border/40 bg-surface shrink-0 flex justify-center">
        
        {/* Animated Border Textarea Wrapper */}
        <div className="group/input-group relative flex w-full items-end p-1 rounded-[24px] bg-background/30 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl isolate [--border-angle:0deg]">
          
          {/* OUTER AURA */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[1px] z-[0] rounded-[26px] opacity-40 blur-[3px] [background:conic-gradient(from_var(--border-angle),transparent_20deg,var(--primitive-primary-400),var(--primitive-info-400),transparent_340deg)] [animation:border-spin_6s_linear_infinite]"
          />

          {/* MAIN BORDER */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] rounded-[24px] p-[1.2px] [background:conic-gradient(from_var(--border-angle),transparent_0deg,transparent_120deg,var(--primitive-primary-400)_180deg,var(--primitive-info-300)_240deg,transparent_300deg)] [animation:border-spin_6s_linear_infinite]"
          >
            <div className="h-full w-full rounded-[23px] bg-surface/95 backdrop-blur-2xl" />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 w-full h-full">
            <Textarea 
              placeholder="Escribe un mensaje..."
              showSendButton
              style={{ resize: 'none' }}
              className="min-h-[80px] max-h-[160px] bg-transparent border-none shadow-none focus-within:shadow-none hover:border-transparent rounded-[23px]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSend={(val) => handleSend(val)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(inputValue);
                }
              }}
            />
          </div>
            
        </div>
      </div>

    </div>
  );
}
