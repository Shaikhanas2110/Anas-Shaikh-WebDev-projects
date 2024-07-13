const sbt = document.getElementById("btn");
const voiceSelect = document.getElementById("voice");
const textArea = document.getElementById("textareaa");
// function populateVoiceList() {
//     const voices = speechSynthesis.getVoices();
//     voices.forEach((voice, index) => {
//         const option = document.createElement('option');
//         option.textContent = `${voice.name} (${voice.lang})`;
//         option.value = index;
//         voiceSelect.appendChild(option);
//     });
// }

// speechSynthesis.onvoiceschanged = populateVoiceList;

// sbt.addEventListener("click" , () => {
//     const text = document.getElementById('textareaa').value;
//     const utterance = new SpeechSynthesisUtterance(text);
//     const selectedVoiceIndex = voiceSelect.value;
//     const voices = speechSynthesis.getVoices();
//     utterance.voice = voices[selectedVoiceIndex];
//     speechSynthesis.speak(utterance);
// })

function voiceList() {
  const voices = speechSynthesis.getVoices();

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.textContent = `(${voice.lang} , ${voice.name})`;
    option.value = index;
    voiceSelect.appendChild(option);
  });
}

speechSynthesis.onvoiceschanged = voiceList;

sbt.addEventListener("click", () => {
  const text = textArea.value;
  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoiceIndex = voiceSelect.value;
  const voices = speechSynthesis.getVoices();

  utterance.voice = voices[selectedVoiceIndex];
  speechSynthesis.speak(utterance);
});
