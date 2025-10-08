import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Leaf, MapPin, FileText, Lightbulb, Bot } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { MOCK_PLANTS } from '../mocks/plants';
import { MOCK_PARKS } from '../mocks/parks';
import { mockPublications } from '../mocks/publications';

interface NavigateFunction {
  (page: string, slug?: string): void;
}

interface AiAssistantPageProps {
  onNavigate: NavigateFunction;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: Array<{
    type: 'plant' | 'park' | 'publication';
    id: string;
    title: string;
  }>;
}

const EXAMPLE_QUERIES = [
  'Tanaman apa saja yang terancam punah?',
  'Taman mana yang memiliki koleksi anggrek?',
  'Publikasi terbaru tentang konservasi',
  'Tanaman endemik Jawa Barat'
];

export function AiAssistantPage({ onNavigate }: AiAssistantPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Halo! Saya AI Assistant Taman Kehati Indonesia. Saya dapat membantu Anda mencari informasi tentang tanaman, taman, dan publikasi. Apa yang ingin Anda ketahui?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): { content: string; suggestions?: any[] } => {
    const lowerQuery = query.toLowerCase();
    
    // Search for endangered plants
    if (lowerQuery.includes('terancam') || lowerQuery.includes('punah') || lowerQuery.includes('endangered')) {
      const endangeredPlants = MOCK_PLANTS.filter(p => 
        p.catatan?.toLowerCase().includes('terancam') || 
        p.catatan?.toLowerCase().includes('dilindungi') ||
        p.catatan?.toLowerCase().includes('langka')
      );
      
      return {
        content: `Saya menemukan ${endangeredPlants.length} spesies tanaman yang terancam punah dalam koleksi Taman Kehati Indonesia. Beberapa di antaranya sangat memerlukan perhatian khusus untuk konservasi.`,
        suggestions: endangeredPlants.slice(0, 3).map(p => ({
          type: 'plant' as const,
          id: String(p.id),
          title: p.nama_ilmiah
        }))
      };
    }
    
    // Search for orchids
    if (lowerQuery.includes('anggrek') || lowerQuery.includes('orchid')) {
      const orchidPlants = MOCK_PLANTS.filter(p => 
        p.familia?.toLowerCase().includes('orchid') || 
        p.nama_umum_lokal?.toLowerCase().includes('anggrek') ||
        p.nama_umum_nasional?.toLowerCase().includes('anggrek')
      );
      
      return {
        content: `Terdapat ${orchidPlants.length} koleksi anggrek di Taman Kehati Indonesia. Anggrek-anggrek ini mencakup berbagai spesies asli Indonesia, baik yang umum maupun yang langka.`,
        suggestions: orchidPlants.slice(0, 3).map(p => ({
          type: 'plant' as const,
          id: String(p.id),
          title: p.nama_ilmiah
        }))
      };
    }
    
    // Search for publications
    if (lowerQuery.includes('publikasi') || lowerQuery.includes('penelitian') || lowerQuery.includes('laporan')) {
      const recentPubs = mockPublications.slice(0, 3);
      
      return {
        content: 'Berikut adalah beberapa publikasi terbaru yang mungkin menarik bagi Anda. Publikasi-publikasi ini mencakup penelitian konservasi, laporan tahunan, dan dokumentasi kegiatan Taman Kehati.',
        suggestions: recentPubs.map(p => ({
          type: 'publication' as const,
          id: p.id,
          title: p.title
        }))
      };
    }
    
    // Search for parks
    if (lowerQuery.includes('taman') || lowerQuery.includes('park')) {
      const parks = MOCK_PARKS.filter(p => p.status === 'published').slice(0, 3);
      
      return {
        content: `Terdapat ${MOCK_PARKS.length} Taman Kehati yang terdaftar di Indonesia. Taman-taman ini berperan penting dalam konservasi ex-situ flora lokal.`,
        suggestions: parks.map(p => ({
          type: 'park' as const,
          id: String(p.id),
          title: p.nama_resmi
        }))
      };
    }
    
    // Search for specific plants
    const matchingPlants = MOCK_PLANTS.filter(p =>
      p.nama_ilmiah.toLowerCase().includes(lowerQuery) ||
      p.nama_umum_lokal?.toLowerCase().includes(lowerQuery) ||
      p.nama_umum_nasional?.toLowerCase().includes(lowerQuery) ||
      p.familia?.toLowerCase().includes(lowerQuery)
    );
    
    if (matchingPlants.length > 0) {
      return {
        content: `Saya menemukan ${matchingPlants.length} tanaman yang sesuai dengan pencarian Anda. Berikut beberapa yang paling relevan:`,
        suggestions: matchingPlants.slice(0, 3).map(p => ({
          type: 'plant' as const,
          id: String(p.id),
          title: p.nama_ilmiah
        }))
      };
    }
    
    // Default response
    return {
      content: 'Maaf, saya belum menemukan informasi spesifik untuk pertanyaan Anda. Coba tanyakan tentang tanaman tertentu, lokasi taman, atau publikasi yang Anda cari. Anda juga bisa menggunakan contoh pertanyaan di bawah untuk memulai.'
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleExampleQuery = (query: string) => {
    setInput(query);
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'plant') {
      onNavigate('koleksi-detail', suggestion.id);
    } else if (suggestion.type === 'park') {
      onNavigate('taman-detail', suggestion.id);
    } else if (suggestion.type === 'publication') {
      onNavigate('publikasi-detail', suggestion.id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-chart-1 text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-10 h-10" />
            <h1>AI Assistant</h1>
          </div>
          <p className="text-primary-foreground/90">
            Asisten cerdas untuk pencarian informasi Taman Kehati Indonesia
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Info Card */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-chart-2/10 to-chart-1/10">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-chart-1 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="mb-2">Tentang AI Assistant</h3>
              <p className="text-sm text-muted-foreground mb-3">
                AI Assistant menggunakan teknologi RAG (Retrieval-Augmented Generation) untuk membantu Anda 
                mencari informasi tentang tanaman, taman, dan publikasi dalam database Taman Kehati Indonesia.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  <Leaf className="w-3 h-3 mr-1" />
                  3,847 Tanaman
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  12 Taman
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <FileText className="w-3 h-3 mr-1" />
                  8 Publikasi
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Chat Container */}
        <Card className="flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, idx) => {
                        const Icon = suggestion.type === 'plant' ? Leaf :
                                   suggestion.type === 'park' ? MapPin : FileText;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left p-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-3"
                          >
                            <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{suggestion.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">U</span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Example Queries (shown when chat is empty) */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-muted-foreground mb-3">Contoh pertanyaan:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {EXAMPLE_QUERIES.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExampleQuery(query)}
                    className="text-left p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-sm"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanyakan sesuatu tentang tanaman, taman, atau publikasi..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          AI Assistant adalah fitur eksperimental. Informasi yang diberikan berdasarkan data dalam sistem dan 
          mungkin tidak selalu lengkap atau akurat.
        </p>
      </div>
    </div>
  );
}
