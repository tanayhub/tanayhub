const socialList = document.createElement("div");
const socials = [
  { icon: "bi-github", source: "https://github.com/tanayhub" },
  { icon: "bi-linkedin", source: "https://linkedin.com/in/tanayhub" },
  { icon: "bi-chat-dots-fill", source: "mailto:contact@tanayhub.com" },
  { icon: "bi-twitter", source: "https://twitter.com/tanayhub" },
  { icon: "bi-instagram", source: "https://instagram.com/tanayhub" },
];
for (const social of socials) {
  const socialIcon = document.createElement("i");
  socialIcon.className = social.icon;

  const socialLink = document.createElement("a");
  socialLink.href = social.source;
  socialLink.appendChild(socialIcon);

  const socialItem = document.createElement("span");
  socialItem.appendChild(socialLink);

  socialList.appendChild(socialItem);
}
document.getElementById("socials").appendChild(socialList);
