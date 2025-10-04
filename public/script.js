document.getElementById("shortenBtn").addEventListener("click", async () => {
  const input = document.getElementById("urlInput");
  const resultDiv = document.getElementById("result");
  const longURL = input.value.trim();

  if (!longURL) {
    resultDiv.innerHTML = "Please enter a URL!";
    return;
  }

  resultDiv.innerHTML = "Generating your short link...";

  try {
    const response = await fetch("/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longURL }),
    });

    const data = await response.json();

    if (data.id) {
      const shortLink = `${window.location.origin}/${data.id}`;
      resultDiv.innerHTML = `
        Your Short URL: 
        <a href="${shortLink}" target="_blank">${shortLink}</a>
      `;
      input.value = "";
    } else {
      resultDiv.innerHTML = `Error: ${data.error}`;
    }
  } catch (err) {
    resultDiv.innerHTML = "Server error. Please try again later.";
  }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the elements we need
    const copyBtn = document.getElementById('copyBtn');
    const resultBox = document.getElementById('result');
    
    // Check if the button exists before adding the listener
    if (copyBtn && resultBox) {
        copyBtn.addEventListener('click', () => {
            // 2. Get the full text of the result box
            // Note: We're taking ALL the text, including "Your Short URL: "
            const linkText = resultBox.innerText.trim();

            // 3. We only want the actual URL, so we split the string
            // Find the index of the colon and space, and take everything after that
            const urlStartIndex = linkText.indexOf(':') + 2; 
            const shortUrl = linkText.substring(urlStartIndex);

            // 4. Use the Clipboard API to copy the text
            navigator.clipboard.writeText(shortUrl).then(() => {
                // SUCCESS FEEDBACK: Change the button text temporarily
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Copied! 🎉';
                
                // Change it back after 1.5 seconds
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                }, 1500);

            }).catch(err => {
                // ERROR FEEDBACK (e.g., if clipboard access is denied)
                console.error('Could not copy text: ', err);
                alert('Copy failed. Please try selecting the link manually.');
            });
        });
    }
    
    // NOTE: You will need to add the code for the 'shortenBtn' functionality 
    // here as well, which will dynamically update the resultBox text!
});