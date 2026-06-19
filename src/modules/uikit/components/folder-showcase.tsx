"use client";

import React from 'react';
import Folder from '@/components/ui/folder';

export function FolderShowcase() {
    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-1">
                <h3 className="text-h3 font-heading font-bold text-foreground">Folders</h3>
                <p className="text-body-sm text-muted-foreground">
                    Carpetas interactivas 3D con variantes de color semánticas.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 rounded-xl bg-surface border border-border shadow-sm overflow-hidden">
                <div className="flex flex-col items-center gap-4">
                    <span className="text-caption font-bold uppercase tracking-widest text-primary">Primary</span>
                    <Folder
                        variant="primary"
                        title="Design Assets"
                        subtitle="42 images"
                        footerText="Updated 2h ago"
                    />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <span className="text-caption font-bold uppercase tracking-widest text-secondary">Secondary</span>
                    <Folder
                        variant="secondary"
                        title="Project Media"
                        subtitle="12 videos"
                        footerText="Updated yesterday"
                    />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <span className="text-caption font-bold uppercase tracking-widest text-warning">Warning</span>
                    <Folder
                        variant="warning"
                        title="Draft Documents"
                        subtitle="8 files"
                        footerText="Updated 3d ago"
                    />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <span className="text-caption font-bold uppercase tracking-widest text-info">Info</span>
                    <Folder
                        variant="info"
                        title="Help Guides"
                        subtitle="15 docs"
                        footerText="Updated 1w ago"
                    />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <span className="text-caption font-bold uppercase tracking-widest text-danger">Error</span>
                    <Folder
                        variant="error"
                        title="Critical Errors"
                        subtitle="3 logs"
                        footerText="Action required"
                    />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <span className="text-caption font-bold uppercase tracking-widest text-success">Success</span>
                    <Folder
                        variant="success"
                        title="Completed Tasks"
                        subtitle="24 results"
                        footerText="All clear"
                    />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <span className="text-caption font-bold uppercase tracking-widest text-muted-foreground">Neutral</span>
                    <Folder
                        variant="neutral"
                        title="Archived Files"
                        subtitle="156 objects"
                        footerText="Last modified 2024"
                    />
                </div>
            </div>
        </section>
    );
}
