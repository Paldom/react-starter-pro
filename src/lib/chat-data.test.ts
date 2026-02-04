import { describe, expect, it } from 'vitest'
import { initialProjects } from './chat-data'

describe('chat-data', () => {
  it('defines the seeded projects and chats', () => {
    expect(initialProjects).toEqual([
      {
        id: 'work',
        name: 'Work',
        chats: [
          { id: 'c4', title: 'Q1 metrics summary' },
          { id: 'c5', title: 'Refactor plan for dashboard' },
        ],
      },
      {
        id: 'client-a',
        name: 'Client A',
        chats: [
          { id: 'c6', title: 'Kickoff notes' },
          { id: 'c7', title: 'Requirements checklist' },
        ],
      },
      {
        id: 'default',
        name: 'Default',
        chats: [
          { id: 'c1', title: 'Trip ideas for April' },
          { id: 'c2', title: 'Draft a project proposal' },
          { id: 'c3', title: 'Explain async/await simply' },
        ],
      },
    ])
  })
})
