import React, { useState } from 'react';
import '../css/IdeaBoard.css';

const IdeaBoard = () => {
  const [columns, setColumns] = useState([
    { 
      id: 1, 
      title: 'Unassigned', 
      count: 2,
      ideas: [
        {
          id: 1,
          title: 'This is a place to plan ✍️ your content',
          description: 'Save your Ideas before converting them into posts. Brainstorm, plan ahead, and refine! To find out more check out...'
        },
        {
          id: 2,
          title: 'Save inspirations you find online with one click 😍',
          description: 'Use ➕ Buffer browser extension to save Ideas from the Web. Highlight text or select an image and right click...'
        }
      ]
    },
    { 
      id: 2, 
      title: 'To Do', 
      count: 0,
      ideas: []
    },
    { 
      id: 3, 
      title: 'In Progress', 
      count: 0,
      ideas: []
    },
    { 
      id: 4, 
      title: 'Done', 
      count: 0,
      ideas: []
    }
  ]);

  const handleAddNewIdea = (columnId) => {
    console.log(`Adding new idea to column ${columnId}`);
    // Implementation would go here
  };

  const handleAddNewGroup = () => {
    console.log('Adding new group');
    // Implementation would go here
  };

  return (
    <div className="idea-board">
      <div className="header">
        <div className="header-left">
          <h1 className="title">Create</h1>
          <button className="generate-ideas-btn">
            <span className="sparkle-icon">✨</span>
            Generate Ideas
          </button>
        </div>
        <div className="header-right">
          <button className="share-btn">
            <span className="share-icon">💬</span>
            Share Feedback
          </button>
          <div className="tags-btn">
            <span className="tag-icon">🏷️</span>
            Tags
            <span className="dropdown-icon">▼</span>
          </div>
          <button className="board-btn">
            <span className="board-icon">📋</span>
            Board
          </button>
          <button className="gallery-btn">
            <span className="gallery-icon">🖼️</span>
            Gallery
          </button>
          <button className="new-idea-btn">
            <span className="plus-icon">+</span>
            New Idea
          </button>
        </div>
      </div>

      <div className="board-content">
        {columns.map((column) => (
          <div key={column.id} className="column">
            <div className="column-header">
              <div className="column-title">
                <span>{column.title}</span>
                <span className="count">{column.count}</span>
              </div>
              <div className="column-actions">
                <button className="add-btn" onClick={() => handleAddNewIdea(column.id)}>+</button>
                {column.title !== 'Unassigned' && <button className="more-btn">...</button>}
              </div>
            </div>
            
            <div className="column-ideas">
              {column.ideas.map((idea) => (
                <div key={idea.id} className="idea-card">
                  <h3>{idea.title}</h3>
                  <p>{idea.description}</p>
                </div>
              ))}
              
              {column.ideas.length === 0 && (
                <div className="new-idea-placeholder">
                  <button className="new-idea-placeholder-btn" onClick={() => handleAddNewIdea(column.id)}>
                    <span className="plus-icon">+</span>
                    New Idea
                  </button>
                </div>
              )}
            </div>
            
            {column.title === 'Unassigned' && column.ideas.length > 0 && (
              <div className="column-footer">
                <button className="new-idea-footer-btn" onClick={() => handleAddNewIdea(column.id)}>
                  <span className="plus-icon">+</span>
                  New Idea
                </button>
              </div>
            )}
          </div>
        ))}
        
        <div className="add-group-column">
          <button className="add-group-btn" onClick={handleAddNewGroup}>
            <span className="plus-icon">+</span>
            New Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaBoard;