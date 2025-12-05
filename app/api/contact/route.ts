import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    
    // TODO: Implement email sending logic here
    // For now, just log the contact request
    console.log('Neue Kontaktanfrage:', { name, email, message });
    
    return NextResponse.json({ success: true, message: 'Nachricht erfolgreich gesendet!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Senden der Nachricht' },
      { status: 500 }
    );
  }
}