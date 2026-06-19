"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Send, Smile, Bot } from 'lucide-react';
import {
    InputGroup,
    InputGroupInput,
    InputGroupButton,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 font-sans">
            {/* --- BOTÓN FLOTANTE --- */}
            <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-primary-400 text-secondary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
                <div className="absolute inset-0 rounded-full bg-secondary-foreground/20 blur-md group-hover:blur-lg transition-all"></div>
                {isOpen ? <X size={28} /> : <Bot size={28} fill="currentColor" />}
            </Button>

            {/* --- VENTANA DE CHAT --- */}
            {isOpen && (
                <div className="absolute top-1/2 -translate-y-1/2 right-20 flex h-[580px] w-[380px] flex-col overflow-hidden rounded-[2.5rem] border border-border/40 bg-surface/10 shadow-2xl backdrop-blur-3xl animate-in fade-in slide-in-from-right-5 duration-300">

                    {/* BLOBS DE FONDO */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        {/* Blob Superior Izquierdo */}
                        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-secondary/90 blur-[90px] "></div>
                        {/* Blob Central */}
                        <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[70px]"></div>
                        {/* Blob Inferior Derecho */}
                        <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-info-500/35 blur-[90px]"></div>
                    </div>

                    {/* Encabezado */}
                    <div className="relative z-10 flex items-center bg-primary-400 justify-between px-6 py-6 text-secondary-foreground shadow-sm">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/iconBlanco.svg"
                                alt="GLocation Logo"
                                width={35}
                                height={35}
                                className="h-[35px] w-auto animate-in fade-in duration-300"
                            />
                            <h3 className="text-lg font-semibold tracking-tight text-white">Preguntale a la IA</h3>
                        </div>
                        <Button
                            variant="secondary"
                            size="icon-sm"
                            onClick={() => setIsOpen(false)}
                            className="w-auto"
                        >
                            <X size={18} />
                        </Button>
                    </div>

                    {/* Área de Mensajes */}
                    <div className="relative z-10 flex-1 overflow-y-auto p-5 space-y-6">

                        {/* Mensaje del Bot (Súper Transparente / Glass) */}
                        <div className="flex items-start gap-2.5">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface/40 text-secondary shadow-sm border border-border/60">
                                <Bot />
                            </div>
                            <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-surface/50 border border-border/30 p-4 text-sm text-foreground shadow-sm backdrop-blur-md">
                                Hola, en que te puedo ayudar hoy?
                            </div>
                        </div>

                        {/* Mensaje del Usuario */}
                        <div className="flex flex-col items-end gap-1">
                            <div className="relative">
                                <div className="max-w-xs rounded-2xl rounded-tr-none bg-secondary/80 text-white p-4 text-sm shadow-lg border border-border/10">
                                    ¿Cómo puedo mejorar mi concentración mientras trabajo?
                                </div>
                            </div>
                        </div>

                        {/* Segundo Mensaje Bot */}
                        <div className="flex items-start gap-2.5">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface/40 text-secondary shadow-sm border border-border/60">
                                <Bot />
                            </div>
                            <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-surface/50 border border-border/30 p-4 text-sm text-foreground shadow-sm backdrop-blur-md">
                                Mantenerse hidratado y escuchar música relajante también puede ayudar. ¿Quieres que te elabore un plan de concentración?
                            </div>
                        </div>
                    </div>

                    {/* Barra de Entrada (Mantenida según tu UI) */}
                    <div className="relative z-10 p-5">
                        <InputGroup
                            variant="command"

                            leftIcon={<Smile className="text-warning size-5" />}
                            rightIcon={
                                <InputGroupButton
                                    size="icon-sm"
                                >
                                    <Send className="size-4" fill="currentColor" />
                                </InputGroupButton>
                            }
                        >
                            <InputGroupInput
                                placeholder="Escribe un mensaje..."
                                className="text-foreground placeholder:text-muted-foreground"
                            />
                        </InputGroup>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;