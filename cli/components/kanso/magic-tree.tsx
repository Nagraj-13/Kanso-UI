'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Star, Folder, File, ChevronRight } from 'lucide-react';

// -------- MagicNode Types --------
export type MagicNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: MagicNode[];
  sparkle?: boolean;
};

export type MagicTreeProps = {
  data?: MagicNode[];
  onSelect?: (node: MagicNode) => void;
  className?: string;
};

// -------- Default Data --------
const defaultMagicData: MagicNode[] = [
  {
    id: '1',
    name: 'Magical Folder',
    type: 'folder',
    sparkle: true,
    children: [
      { id: '1-1', name: 'Shiny File.txt', type: 'file', sparkle: true },
      {
        id: '1-2',
        name: 'Hidden Gems',
        type: 'folder',
        children: [
          { id: '1-2-1', name: 'Gem.js', type: 'file', sparkle: true },
        ],
      },
    ],
  },
  { id: '2', name: 'Plain File.md', type: 'file' },
];

export function MagicTree({
  data = defaultMagicData,
  onSelect,
  className,
}: MagicTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    '1': true,
    '1-2': true,
  });
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNodes = (nodes: MagicNode[], level = 0) => {
    return nodes.map((n) => (
      <div key={n.id} className="relative group/node">
        <motion.div
          className={cn(
            'relative flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer select-none text-sm transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 border',
            selected === n.id
              ? 'text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50/80 dark:bg-indigo-500/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] border-indigo-100/50 dark:border-indigo-500/20'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 border-transparent'
          )}
          style={{
            paddingLeft: level * 20 + 8,
            marginBottom: 2,
          }}
          onClick={() => {
            if (n.type === 'folder') toggle(n.id);
            setSelected(n.id);
            onSelect?.(n);
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (n.type === 'folder') toggle(n.id);
              setSelected(n.id);
              onSelect?.(n);
            }
          }}
          whileHover={{ x: n.type === 'file' ? 2 : 0 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Chevron for Folders */}
          {n.type === 'folder' ? (
            <motion.div
              animate={{ rotate: expanded[n.id] ? 90 : 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center justify-center w-4 h-4 shrink-0"
            >
              <ChevronRight
                size={14}
                className={
                  selected === n.id
                    ? 'text-indigo-500'
                    : 'text-zinc-400 group-hover/node:text-zinc-500'
                }
              />
            </motion.div>
          ) : (
            <div className="w-4 h-4 shrink-0" /> // Spacer for files to align with folders
          )}

          {/* Node Icon */}
          <div className="flex items-center justify-center w-5 h-5 shrink-0">
            {selected === n.id ? (
              <Star
                size={14}
                className="text-amber-500 fill-amber-500/30 drop-shadow-[0_0_4px_rgba(245,158,11,0.4)]"
              />
            ) : n.type === 'folder' ? (
              <Folder
                size={14}
                className={cn(
                  'transition-colors',
                  expanded[n.id]
                    ? 'text-blue-500 fill-blue-500/20'
                    : 'text-zinc-400 group-hover/node:text-zinc-500'
                )}
              />
            ) : (
              <File
                size={14}
                className="text-zinc-400 group-hover/node:text-zinc-500 transition-colors"
              />
            )}
          </div>

          <span className="flex-1 truncate">{n.name}</span>

          {n.sparkle && (
            <motion.div
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
              }}
            >
              <Sparkles
                size={14}
                className={cn(
                  'opacity-50 transition-opacity duration-300 drop-shadow-[0_0_2px_rgba(245,158,11,0.4)]',
                  selected === n.id
                    ? 'text-amber-500 opacity-100'
                    : 'text-amber-400 group-hover/node:opacity-100'
                )}
              />
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {n.children && n.children.length > 0 && expanded[n.id] && (
            <motion.div
              role="group"
              initial={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
              animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
              exit={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative overflow-hidden origin-top"
            >
              <div
                className="absolute top-0 bottom-2 w-px bg-gradient-to-b from-zinc-200/80 via-zinc-200/80 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/80 dark:to-transparent"
                style={{ left: level * 20 + 26 }}
              />
              <div className="pt-1">{renderNodes(n.children, level + 1)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ));
  };

  return (
    <div className={cn('space-y-0 font-sans w-full select-none', className)}>
      {renderNodes(data)}
    </div>
  );
}
