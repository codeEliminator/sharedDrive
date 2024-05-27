import { useState, useEffect } from 'react';

// declare global {
//   interface Window {
//     webkitSpeechRecognition: any;
//   }
// }

const useSpeechRecognition = () => {
  const [text, setText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<null | SpeechRecognition>(null);

  useEffect(() => {
    if(typeof window !== 'undefined' && window.webkitSpeechRecognition != null){
      const newRecognition = new window.webkitSpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.lang = 'ru-RU';

      newRecognition.onresult = (event: SpeechRecognitionEvent) => {
        console.log('onResult: ', event);
        setText(event.results[0][0].transcript);
      };

      newRecognition.onerror = (event: any) => {
        console.error('Recognition error:', event.error);
      };

      newRecognition.onend = () => {
        console.log('Recognition ended');
        // setIsListening(false);
      };

      setRecognition(newRecognition);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setText('');
      setIsListening(true);
      recognition.start();
    } else {
      console.error('Speech Recognition is not supported in this browser.');
    }
  };

  const stopListening = () => {
    if (recognition) {
      setText('');
      setIsListening(false);
      recognition.stop();
    }
  };

  return {
    text,
    isListening,
    setText,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognition;
