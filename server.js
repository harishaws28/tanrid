const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize users.json if it doesn't exist
async function initializeUsersFile() {
    try {
        await fs.access(USERS_FILE);
    } catch (error) {
        await fs.writeFile(USERS_FILE, '[]', 'utf8');
    }
}

// Read users from file
async function readUsers() {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Write users to file
async function writeUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// Registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, company } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Read existing users
        const users = await readUsers();

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists with this email' 
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            password: hashedPassword,
            company: company || '',
            registeredAt: new Date().toISOString()
        };

        // Add user to array and save
        users.push(newUser);
        await writeUsers(users);

        res.json({ 
            success: true, 
            message: 'Registration successful',
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                company: newUser.company
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }

        // Read users
        const users = await readUsers();

        // Find user by email
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        res.json({ 
            success: true, 
            message: 'Login successful',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                company: user.company
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

// Get all users (for development/testing)
app.get('/api/users', async (req, res) => {
    try {
        const users = await readUsers();
        const safeUsers = users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            company: user.company,
            registeredAt: user.registeredAt
        }));
        res.json(safeUsers);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Start server
async function startServer() {
    await initializeUsersFile();
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Users file: ${USERS_FILE}`);
    });
}

startServer().catch(console.error);
