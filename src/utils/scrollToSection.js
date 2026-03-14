// utils/scrollToSection.js
export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    window.history.pushState(null, null, `${id}`);
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
