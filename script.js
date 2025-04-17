async function search() {
    const query = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
  
    if (!query.trim()) return;
  
    resultsDiv.innerHTML = "<p>Loading...</p>";
  
    const url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=${encodeURIComponent(query)}&pageNumber=1&pageSize=10&autoCorrect=true`;
  
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'YOUR_API_KEY_HERE', // Replace this
        'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
      }
    };
  
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      const results = data.value;
  
      if (!results.length) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
      }
  
      resultsDiv.innerHTML = results.map(r => `
        <div style="margin-bottom: 20px;">
          <a href="${r.url}" target="_blank"><h3>${r.title}</h3></a>
          <p>${r.description}</p>
          <small>${r.url}</small>
        </div>
      `).join('');
    } catch (err) {
      console.error(err);
      resultsDiv.innerHTML = "<p>Something went wrong. Try again.</p>";
    }
  }
  