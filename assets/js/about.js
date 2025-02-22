document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const storyMore = document.querySelector('.story-more');
    
    if (readMoreBtn && storyMore) {
        // Initial state
        storyMore.style.display = 'none';
        
        readMoreBtn.addEventListener('click', function() {
            if (storyMore.style.display === 'none') {
                storyMore.style.display = 'inline';
                readMoreBtn.textContent = 'Read Less';
            } else {
                storyMore.style.display = 'none';
                readMoreBtn.textContent = 'Read More';
            }
        });
    }
});