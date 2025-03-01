'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface VoiceWidgetProps {
  vapiKey: string;
  assistantId: string;
}

export function VoiceWidget({ vapiKey, assistantId }: VoiceWidgetProps) {
  useEffect(() => {
    console.log('Vapi Config:', { vapiKey, assistantId }); // Debug log
    
    // Initialize Vapi widget when the script is loaded
    const initVapi = () => {
      if (typeof window.vapiSDK !== 'undefined') {
        try {
          window.vapiSDK.run({
            apiKey: vapiKey,
            assistant: assistantId,
            config: {
              position: "bottom-right",
              offset: "90px",
              width: "200px",
              height: "40px",
              idle: {
                color: "#000000",
                type: "pill",
                title: "Talk to AI Assistant",
                subtitle: "Click to start",
                icon: "https://unpkg.com/lucide-static@0.321.0/icons/message-circle.svg",
                borderColor: "#2d5731",
                textColor: "#FFFFFF"
              },
              loading: {
                color: "#000000",
                type: "pill",
                title: "Connecting...",
                subtitle: "Please wait",
                icon: "https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg",
                borderColor: "#2d5731",
                textColor: "#FFFFFF"
              },
              active: {
                color: "#000000",
                type: "pill",
                title: "Call in progress...",
                subtitle: "Click to end call",
                icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg",
                borderColor: "#2d5731",
                textColor: "#FFFFFF"
              }
            }
          });
          console.log('Vapi widget initialized successfully');
        } catch (error) {
          console.error('Error initializing Vapi widget:', error);
        }
      } else {
        console.warn('Vapi SDK not loaded yet');
      }
    };

    // Add event listener for when the script loads
    window.addEventListener('vapiSDKLoaded', initVapi);

    // Also try to initialize immediately if the script is already loaded
    if (typeof window.vapiSDK !== 'undefined') {
      initVapi();
    }

    return () => {
      window.removeEventListener('vapiSDKLoaded', initVapi);
    };
  }, [vapiKey, assistantId]);

  return (
    <div>
      <Script
        src="https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Vapi script loaded, dispatching event');
          window.dispatchEvent(new Event('vapiSDKLoaded'));
        }}
        onError={(e) => {
          console.error('Error loading Vapi script:', e);
        }}
      />
    </div>
  );
}

// Update TypeScript declaration to include the new offset type
declare global {
  interface Window {
    vapiSDK: {
      run: (config: {
        apiKey: string;
        assistant: string;
        config?: {
          position?: string;
          offset?: string | {
            top?: string;
            right?: string;
          };
          width?: string;
          height?: string;
          idle?: {
            color?: string;
            type?: string;
            title?: string;
            subtitle?: string;
            icon?: string;
            borderColor?: string;
            textColor?: string;
          };
          loading?: {
            color?: string;
            type?: string;
            title?: string;
            subtitle?: string;
            icon?: string;
            borderColor?: string;
            textColor?: string;
          };
          active?: {
            color?: string;
            type?: string;
            title?: string;
            subtitle?: string;
            icon?: string;
            borderColor?: string;
            textColor?: string;
          };
        };
      }) => void;
    };
  }
} 