import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext'; // AuthContext ko import karein

const IssueContext = createContext();
export const useIssues = () => useContext(IssueContext);

// Naye fields (severity, department) ke saath updated dummy data
const initialIssues = [
    {
        id: 1, 
        title: "Badi Pothole Sector 5 Road Par", 
        description: "Pichle 2 hafton se yahan traffic jaam ho raha hai.", 
        category: "pothole",
        department: "Public Works Department (PWD)",
        severity: "high",
        location: "Sector 5, Main Road", 
        photo: "https://images.unsplash.com/photo-1593435318692-d38a13b63b28?q=80&w=2070&auto=format&fit=crop", 
        status: "open", 
        votes: { up: 42, down: 3 }, 
        author: "Ravi Kumar", 
        authorId: 12345 // Reporter ki unique ID
    },
    {
        id: 2, 
        title: "Kachre ka dher", 
        description: "Nagar Nigam ki gaadi 5 din se nahin aayi.", 
        category: "waste",
        department: "Nagar Nigam",
        severity: "medium",
        location: "Sabzi Mandi Ke Paas", 
        photo: "https://images.unsplash.com/photo-1582481427102-3fb8a4740263?q=80&w=1974&auto=format&fit=crop", 
        status: "resolved", 
        votes: { up: 78, down: 1 }, 
        author: "Priya Sharma", 
        authorId: 54321
    },
    {
        id: 3, 
        title: "Paani Leak Ho Raha Hai", 
        description: "Main pipeline se paani beh raha hai.", 
        category: "water",
        department: "Jal Sichai Vibhag",
        severity: "low",
        location: "Nehru Park Corner", 
        photo: "https://images.unsplash.com/photo-1505672537424-558726513646?q=80&w=1974&auto=format&fit=crop", 
        status: "open", 
        votes: { up: 12, down: 0 }, 
        author: "Amit Singh", 
        authorId: 12345 // Is user ne 2 issue report kiye hain
    }
];

export const IssueProvider = ({ children }) => {
    const [issues, setIssues] = useState(initialIssues);
    const { addPoints } = useAuth(); // AuthContext se addPoints function lein

    // Naya issue add karne ka function
    const addIssue = (issueData) => {
        const newIssue = { 
            ...issueData, 
            id: Date.now(), 
            status: 'open', 
            votes: { up: 1, down: 0 }, // Reporter ka pehla vote
            photo: URL.createObjectURL(issueData.photo) 
        };
        setIssues(prevIssues => [newIssue, ...prevIssues]);
    };

     // Upvote ya downvote karne ka function
    const voteOnIssue = (id, type) => {
        setIssues(issues.map(p => p.id === id ? { ...p, votes: { ...p.votes, [type]: p.votes[type] + 1 } } : p));
    };


    // Severity ke hisaab se points dene ka function
    const getPoints = (severity) => {
      if (severity === 'high') return 50;
      if (severity === 'medium') return 25;
      return 10;
    };
    // Admin dwara issue ko resolve karne ka function
    const resolveIssue = (id) => {
        let issueToResolve = null;
        const updatedIssues = issues.map(p => {
            if (p.id === id) {
                issueToResolve = { ...p, status: 'resolved' };
                return issueToResolve;
            }
            return p;
        });

        if (issueToResolve) {
            const points = getPoints(issueToResolve.severity);
            // NOTE: Yahan hum maan rahe hain ki hum reporter ko points de rahe hain.
            // Asli app mein, aapko authorId se user dhoondhna hoga.
            addPoints(points); 
            setIssues(updatedIssues);
        }
    };
    const value = { issues, addIssue, voteOnIssue, resolveIssue };
    return <IssueContext.Provider value={value}>{children}</IssueContext.Provider>;
};
