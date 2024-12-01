class ChapterBreak {
    static get toolbox() {
      return {
        title: 'Chapter Break',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H21M9 4L12 7L15 4M9 20L12 17L15 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      };
    }
  
    static get isInline() {
      return false;
    }
  
    data: {
      text: string;
      isFirst?: boolean;
    };
  
    config: {
      defaultText: string;
    };
  
    constructor({ data, config }: { data: { text: string; isFirst?: boolean }; config: { defaultText: string } }) {
      this.data = {
        text: data.text || config.defaultText || '* * *',
        isFirst: data.isFirst || false
      };
      this.config = config;
    }
  
    render() {
      const wrapper = document.createElement('div');
      wrapper.classList.add('chapter-break');
      
      if (this.data.isFirst) {
        wrapper.classList.add('first-chapter');
      }
      
      const line1 = document.createElement('div');
      line1.classList.add('chapter-break-line');
      
      const text = document.createElement('div');
      text.classList.add('chapter-break-text');
      text.contentEditable = true;
      text.innerHTML = this.data.text;
      
      const line2 = document.createElement('div');
      line2.classList.add('chapter-break-line');
      
      wrapper.appendChild(line1);
      wrapper.appendChild(text);
      wrapper.appendChild(line2);
  
      // Prevent deletion of first chapter
      if (this.data.isFirst) {
        wrapper.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault();
          }
        });
      }
  
      // Dispatch a custom event when a ChapterBreak is created
      const chapterBreakCreatedEvent = new CustomEvent('chapterBreakCreated', {
        detail: { text: this.data.text, isFirst: this.data.isFirst }
      });
      document.dispatchEvent(chapterBreakCreatedEvent); // Dispatch on document instead of wrapper
  
      return wrapper;
    }
  
    save(blockContent: HTMLElement) {
      const text = blockContent.querySelector('.chapter-break-text')?.innerHTML || this.config.defaultText;
      return {
        text: text,
        isFirst: this.data.isFirst
      };
    }
  }
  
  export default ChapterBreak;