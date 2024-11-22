
import { getCustomSession } from '../sessionCode';

export default async function handler(req, res) {
    

    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set session data
    const session = await getCustomSession();
    session.username = username;
    session.role = user.role;
    await session.save();

    res.status(200).json({ role: user.role });
}
