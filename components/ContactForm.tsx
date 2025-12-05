'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mail, User, MessageCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitMessage('Danke für deine Nachricht! Ich melde mich bald bei dir.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage('Fehler beim Senden. Bitte versuche es später nochmal.');
      }
    } catch (error) {
      setSubmitMessage('Fehler beim Senden. Bitte versuche es später nochmal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="card-3d bg-gray-900/30 border-gray-700/50 backdrop-blur-xl hover-lift transition-all duration-500 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-center mb-4">
          <Mail className="h-12 w-12 text-cyan-400 animate-float hover-rotate neon-text" />
        </div>
        <CardTitle className="text-3xl text-center text-white group-hover:text-cyan-300 transition-colors duration-300 animate-glow-pulse">
          Schreib mir kurz, was du vorhast
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group/input">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover/input:text-cyan-400 transition-colors duration-300" />
            <Input
              placeholder="Dein Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-gray-800/50 border-gray-600 text-white pl-12 py-3 text-lg hover-glow transition-all duration-300 focus:scale-105 focus:border-cyan-400 backdrop-blur-sm"
            />
          </div>
          
          <div className="relative group/input">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover/input:text-cyan-400 transition-colors duration-300" />
            <Input
              type="email"
              placeholder="Deine E-Mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-gray-800/50 border-gray-600 text-white pl-12 py-3 text-lg hover-glow transition-all duration-300 focus:scale-105 focus:border-cyan-400 backdrop-blur-sm"
            />
          </div>
          
          <div className="relative group/input">
            <MessageCircle className="absolute left-3 top-4 h-5 w-5 text-gray-400 group-hover/input:text-cyan-400 transition-colors duration-300" />
            <textarea
              placeholder="Beschreibe kurz dein Projekt oder deine Idee..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="w-full p-4 pl-12 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover-glow transition-all duration-300 focus:scale-105 focus:border-cyan-400 backdrop-blur-sm text-lg resize-none"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 transition-all duration-300 hover-lift animate-pulse-glow relative overflow-hidden group/btn ${isSubmitting ? 'animate-pulse' : ''}`}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Send className={`w-5 h-5 ${isSubmitting ? 'animate-bounce' : ''}`} />
              {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </form>
        
        {submitMessage && (
          <p className={`mt-6 text-center text-lg font-semibold ${
            submitMessage.includes('Danke') ? 'text-green-400 neon-text' : 'text-red-400'
          } animate-slide-in-up animate-glow-pulse`}>
            {submitMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}