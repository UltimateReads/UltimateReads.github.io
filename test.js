// Toggle theme between light and dark
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  });
  
  function generateAITest() {
    const bookContent = document.getElementById('bookContent').value;
  
    if (!bookContent.trim()) {
      alert("Please paste the content first!");
      return;
    }
  
    // Simulate keyword extraction from the book content
    const keywords = extractKeywords(bookContent);
    
    // Generate questions based on extracted keywords
    const questions = keywords.map((keyword, index) => {
      // Randomly pick a correct answer (A, B, C, or D)
      const correctAnswer = String.fromCharCode(65 + Math.floor(Math.random() * 4));
  
      return {
        question: `What does "${keyword}" mean?`,
        options: [
          `Option 1 related to ${keyword}`,
          `Option 2 related to ${keyword}`,
          `Option 3 related to ${keyword}`,
          `Option 4 related to ${keyword}`
        ],
        answer: correctAnswer
      };
    });
  
    // Store questions globally for evaluation
    window.generatedQuestions = questions;
  
    // Display questions in the form
    let questionsHtml = '';
    questions.forEach((q, index) => {
      questionsHtml += `
        <div class="question">
          <p>${index + 1}. ${q.question}</p>
          ${q.options.map((opt, i) => `
            <label>
              <input type="radio" name="q${index}" value="${String.fromCharCode(65 + i)}" /> ${opt}
            </label><br>
          `).join('')}
        </div>
      `;
    });
  
    document.getElementById('questionsContainer').innerHTML = questionsHtml;
    document.getElementById('quizForm').style.display = 'block';
  }
  
    document.getElementById('questionsContainer').innerHTML = questionsHtml;
    document.getElementById('quizForm').style.display = 'block';
  
  
  // Simulated Keyword Extraction Function
  function extractKeywords(text) {
    const words = text.split(/\s+/);
    const uniqueWords = [...new Set(words)];
    const filteredWords = uniqueWords.filter(word => word.length > 4); // Filter out short words
    return filteredWords.slice(0, 5); // Return top 5 "keywords"
  }
  
  // Evaluate the Test
  function evaluateTest(event) {
    event.preventDefault();
  
    const questions = [
      { answer: "A" },
      { answer: "A" },
      { answer: "A" },
      { answer: "A" },
      { answer: "A" }
    ];
  
    let score = 0;
    let totalQuestions = questions.length;
  
    questions.forEach((q, index) => {
      const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`)?.value;
      if (selectedAnswer === q.answer) {
        score++;
      }
    });
  
    document.getElementById('score').innerText = score;
    document.getElementById('totalQuestions').innerText = totalQuestions;
    document.getElementById('result').style.display = 'block';
  }
  
  // Reset Quiz
  function resetQuiz() {
    document.getElementById('quizForm').style.display = 'none';
    document.getElementById('result').style.display = 'none';
  }
  