document.addEventListener('DOMContentLoaded', async () => {
    const userId = "1356144802772815973";
    const apiUrl = `https://discord-lookup-api-alpha.vercel.app/v1/user/${userId}`;
    const profilePicture = document.getElementById('profile-picture');
    const avatarFrame = document.getElementById('avatar-frame');

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("API Response:", data);

        profilePicture.src = data.avatar?.link || './assets/pfp/default.jpg';
        
        if (data.avatar_decoration?.asset) {
            avatarFrame.src = `https://cdn.discordapp.com/avatar-decoration-presets/${data.avatar_decoration.asset}.png`;
            avatarFrame.style.display = 'block';
        } else {
            console.warn("No avatar frame asset found.");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
});
