import bcrypt from 'bcrypt';

async function testHashing(password) {
    const saltRounds = 10; // Adjust as needed

    // Hash the password
    try {
        // const hashedPassword = '$2b$10$.2/EJcq3w/sTIsxmE6sHOOx2kMJIBU0V48KGogbBFLCA5yMG7DFSm'
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        // Simulate password comparison (replace with your actual user object)
        const user = { password: hashedPassword }; // Placeholder for actual hashed password
        const isPasswordMatch = await bcrypt.compare('1234','$2b$10$2VZG3cy9by2dc8FahO59R.CyOrw0BXZvNGt5gUa5spc28CAnen/hS');
        console.log("unhashed password: "+password);
        console.log('Password match:', isPasswordMatch);
    } catch (error) {
        console.error('Error:', error);
    }
}

const testPassword = '1234';
testHashing(testPassword);