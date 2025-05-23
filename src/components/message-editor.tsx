import { useRef, useState } from 'react';
import { Bold, Italic, Code, Link2, Type, MoreHorizontal } from 'lucide-react';
import useStore from '@/lib/store';

const ToneOptions = () => {
  const { composeMessage, setComposeMessage } = useStore();
  const [showOptions, setShowOptions] = useState(false);

  const handleToneClick = (tone: string) => {
    // This would actually modify the text based on the selected tone in a real app
    alert(`Changing tone to: ${tone}`);
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <div className="absolute bottom-full left-0 mb-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-20">
        <div className="p-1">
          <button onClick={() => handleToneClick('rephrase')} className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">
            Rephrase
          </button>
          <button onClick={() => handleToneClick('friendly')} className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">
            More friendly
          </button>
          <button onClick={() => handleToneClick('formal')} className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">
            More formal
          </button>
          <button onClick={() => handleToneClick('fix')} className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">
            Fix grammar & spelling
          </button>
          <button onClick={() => handleToneClick('translate')} className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">
            Translate...
          </button>
        </div>
      </div>
    </div>
  );
};

const MessageEditor = () => {
  const [showFormatting, setShowFormatting] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showToneOptions, setShowToneOptions] = useState(false);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const { composeMessage, setComposeMessage } = useStore();

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
    } else {
      setSelectedText('');
    }
  };

  return (
    <div className="border-t">
      {showFormatting && (
        <div className="flex items-center p-2 border-b gap-1">
          <button className="p-1 rounded hover:bg-gray-100">
            <Bold className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <Italic className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <Code className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <Link2 className="h-4 w-4 text-gray-500" />
          </button>
          <button 
            className="p-1 rounded hover:bg-gray-100 ml-2"
            onClick={() => setShowToneOptions(!showToneOptions)}
          >
            <Type className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-1 rounded hover:bg-gray-100 ml-auto">
            <MoreHorizontal className="h-4 w-4 text-gray-500" />
          </button>
          
          {showToneOptions && <ToneOptions />}
        </div>
      )}
      
      {selectedText && (
        <div className="absolute bg-white shadow-lg rounded-lg p-2 z-10 flex gap-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <Bold className="h-4 w-4" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Italic className="h-4 w-4" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Link2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageEditor;