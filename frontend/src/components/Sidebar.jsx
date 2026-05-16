import { useState } from 'react';
import Swal from 'sweetalert2';
import './Sidebar.css';

export default function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onRenameConversation,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  const startRename = (e, conv) => {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditingTitle(conv.title || 'New Conversation');
  };

  const commitRename = (id) => {
    const trimmed = editingTitle.trim();
    if (trimmed) {
      onRenameConversation(id, trimmed);
    }
    setEditingId(null);
  };

  const handleRenameKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitRename(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: 'Delete conversation?',
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#374151',
      background: '#1e2435',
      color: '#e2e8f0',
    });
    if (result.isConfirmed) {
      onDeleteConversation(id);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">⚖️</div>
          <h1>Quorum</h1>
        </div>
        <button className="new-conversation-btn" onClick={onNewConversation}>
          + New Chat
        </button>
      </div>

      <div className="conversation-list">
        {conversations.length === 0 ? (
          <div className="no-conversations">No conversations yet</div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${conv.id === currentConversationId ? 'active' : ''}`}
              onClick={() => editingId !== conv.id && onSelectConversation(conv.id)}
              onMouseEnter={() => setHoveredId(conv.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {editingId === conv.id ? (
                <input
                  className="rename-input"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={() => commitRename(conv.id)}
                  onKeyDown={(e) => handleRenameKeyDown(e, conv.id)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              ) : (
                <>
                  <div className="conversation-title">
                    {conv.title || 'New Conversation'}
                  </div>
                  <div className="conversation-actions">
                    <span className="conversation-meta">
                      {conv.message_count} msg
                    </span>
                    {(hoveredId === conv.id || currentConversationId === conv.id) && (
                      <div className="action-buttons">
                        <button
                          className="action-btn rename-btn"
                          title="Rename"
                          onClick={(e) => startRename(e, conv)}
                        >
                          ✏️
                        </button>
                        <button
                          className="action-btn delete-btn"
                          title="Delete"
                          onClick={(e) => handleDelete(e, conv.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
