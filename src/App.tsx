import { AIAssistant, AIAssistantPromptRequestArgs, AIAssistantSettingsModel, HtmlEditor, Image, Inject, Link, QuickToolbar, QuickToolbarSettingsModel, RichTextEditorComponent, Toolbar, ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { useRef } from 'react';
import './App.css';

function App() {

  const editorRef = useRef<RichTextEditorComponent | null>(null);

  const toolbarSettings: ToolbarSettingsModel = {
    items: ['AICommands', 'AIQuery', '|', 'Bold', 'Italic', 'Underline', 'StrikeThrough', '|', 'Alignments', 'Formats', 'OrderedList',
      'UnorderedList', 'CheckList', 'CodeBlock', 'Blockquote', 'CreateLink', 'Image', 'CreateTable', '|', 'SourceCode', '|', 'Undo', 'Redo']
  };

  const quickToolbarSettings: QuickToolbarSettingsModel = {
    text: ['AICommand', 'AIQuery', 'Bold', 'Italic', 'Underline', 'StrikeThrough', 'Fontcolor', 'BackgroundColor', '|', 'Unorderedlist', 'Orderedlist']
  }

  const aiAssistantSettings: AIAssistantSettingsModel = {
    popupWidth: '550px'
  }

  let abortController: AbortController;

  async function onAIAssistantPromptRequest(args: AIAssistantPromptRequestArgs): Promise<void> {

    if (editorRef.current === null) {
      return;
    }
    try {
      abortController = new AbortController();
      const response: Response = await fetch('http://localhost:3000/api/stream', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ message: args.prompt + (args.text) }),
        signal: abortController.signal
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      const stream: ReadableStream<string> = (response.body as any).pipeThrough(new TextDecoderStream());
      let fullText: string = '';
      for await (const chunk of stream as unknown as AsyncIterable<string>) {
        fullText += chunk;
        editorRef.current.addAIPromptResponse(fullText, false);
      }
      editorRef.current.addAIPromptResponse(fullText, true);

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('AI Request aborted by user.');
        return;
      } else {
        console.error('There was a problem with your fetch operation:', error);
      }
    }
  }

  return (
    <div className="App">
      <RichTextEditorComponent height={450} toolbarSettings={toolbarSettings} quickToolbarSettings={quickToolbarSettings}
        ref={editorRef} aiAssistantSettings={aiAssistantSettings}
        aiAssistantPromptRequest={onAIAssistantPromptRequest}>
        <p><strong>Editing and Improving</strong></p>
        <p>In today's competitive landscape, effective marketing focuses on building lasting customer relationships
          rather than just selling products. Brands are expected to provide personalized experiences through data
          analytics and consumer insights. As expectations evolve, marketers must stay agile and proactive in their
          strategies.</p>
        <p><strong>Tone and style</strong></p>
        <p>Agile methodologies are essential in modern project management, particularly in software development.
          They enable teams to adapt quickly and deliver greater customer value through iterative processes and
          collaboration. Successful Agile implementation requires fostering a culture of adaptability, trust,
          and shared ownership.</p>
        <p><strong>Grammar</strong></p>
        <p>Strong leadership is more than directing a team—it's about inspiring people toward a common vision.
          Effective leaders cultivate transparency, empathy, and accountability within their organizations.
          They empower others by encouraging autonomy and providing opportunities for growth. In times of
          uncertainty or rapid change, it's the leaders who stay grounded and lead with clarity who build the
          most resilient and high-performing teams.</p>
        <p><strong>Summarization, simplification, or elaboration</strong></p>
        <p>Strong leadership inspires a team toward a shared vision while promoting transparency, empathy,
          and accountability. Effective leaders empower others through autonomy and growth. In times of
          uncertainty or change, clear leaders build resilient, high-performing teams.</p>
        <Inject services={[AIAssistant, Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
      </RichTextEditorComponent>
    </div>
  );
}

export default App;
