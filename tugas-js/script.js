// Array berisi teks yang akan ditampilkan dengan efek typing
const typingTexts = [
  { text: "I am a Web Developer", color: "#2563eb" }, // Biru untuk Web Developer
  { text: "I am a UI/UX Designer", color: "#7c3aed" }, // Ungu untuk UI/UX Designer
  { text: "I am a Frontend Enthusiast", color: "#ec4899" }, // Pink untuk Frontend Enthusiast
];

// Variabel untuk mengontrol status typing animation
let currentTextIndex = 0; // Index teks yang sedang aktif
let currentCharIndex = 0; // Index karakter yang sedang diketik
let isDeleting = false; // Status apakah sedang menghapus text
let typingSpeed = 100; // Kecepatan mengetik dalam milliseconds

// Mendapatkan elemen DOM untuk menampilkan teks
const typingElement = document.getElementById("typingText");

// Fungsi utama untuk mengatur efek typing animation
function typeText() {
  // Mendapatkan objek teks yang sedang aktif
  const currentText = typingTexts[currentTextIndex];

  // Mengatur warna teks sesuai dengan teks yang sedang aktif
  typingElement.style.color = currentText.color;

  // Logika untuk menampilkan atau menghapus karakter
  if (isDeleting) {
    // Jika sedang menghapus, kurangi karakter dari belakang
    typingElement.textContent = currentText.text.substring(
      0,
      currentCharIndex - 1
    );
    currentCharIndex--;
    typingSpeed = 50; // Kecepatan menghapus lebih cepat
  } else {
    // Jika sedang mengetik, tambah karakter dari depan
    typingElement.textContent = currentText.text.substring(
      0,
      currentCharIndex + 1
    );
    currentCharIndex++;
    typingSpeed = 100; // Kecepatan mengetik normal
  }

  // Kondisi ketika selesai mengetik semua karakter
  if (!isDeleting && currentCharIndex === currentText.text.length) {
    // Pause sejenak sebelum mulai menghapus
    typingSpeed = 2000;
    isDeleting = true;
  }
  // Kondisi ketika selesai menghapus semua karakter
  else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    // Pindah ke teks berikutnya, kembali ke awal jika sudah mencapai akhir array
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    typingSpeed = 500; // Pause sejenak sebelum mulai mengetik teks baru
  }

  // Memanggil fungsi ini lagi setelah delay sesuai typingSpeed
  setTimeout(typeText, typingSpeed);
}

// Fungsi untuk mengatur smooth scroll ke section tertentu
function smoothScrollTo(targetId) {
  // Mendapatkan elemen target berdasarkan ID
  const targetElement = document.getElementById(targetId);

  // Jika elemen ditemukan, lakukan scroll dengan smooth behavior
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth", // Efek scroll yang halus
      block: "start", // Scroll ke bagian atas elemen
    });
  }
}

// Fungsi untuk mengatur navigasi mobile (hamburger menu)
function setupMobileNavigation() {
  // Mendapatkan elemen hamburger dan nav menu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Event listener untuk toggle menu saat hamburger diklik
  hamburger.addEventListener("click", function () {
    // Toggle class 'active' pada hamburger untuk animasi
    hamburger.classList.toggle("active");
    // Toggle class 'active' pada nav menu untuk menampilkan/menyembunyikan
    navMenu.classList.toggle("active");
  });

  // Event listener untuk menutup menu saat link navigasi diklik
  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      // Hapus class 'active' untuk menutup menu
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Fungsi untuk mengatur smooth scroll pada semua link navigasi
function setupSmoothScrolling() {
  // Mendapatkan semua link navigasi
  const navLinks = document.querySelectorAll(".nav-link");

  // Menambahkan event listener untuk setiap link navigasi
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Mencegah behavior default link

      // Mendapatkan target ID dari href (menghilangkan karakter #)
      const targetId = this.getAttribute("href").substring(1);

      // Memanggil fungsi smooth scroll
      smoothScrollTo(targetId);
    });
  });
}

// Fungsi untuk mengirim pesan ke WhatsApp dengan data dari form
function sendToWhatsApp(name, email, message) {
  // Nomor WhatsApp tujuan (ganti dengan nomor yang sebenarnya)
  const phoneNumber = "6281268088246"; // Format: 62 + nomor tanpa 0 di depan

  // Membuat template pesan yang akan dikirim
  const whatsappMessage =
    `Halo, saya ${name}%0A` + `Email: ${email}%0A%0A` + `Pesan:%0A${message}`;

  // Membuat URL WhatsApp dengan pesan yang sudah diformat
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  // Membuka WhatsApp di tab/window baru
  window.open(whatsappURL, "_blank");
}

// Fungsi untuk mengatur form contact
function setupContactForm() {
  // Mendapatkan elemen form
  const contactForm = document.getElementById("contactForm");

  // Event listener untuk submit form
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah form submission default

    // Mendapatkan nilai dari input form
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validasi: pastikan semua field terisi
    if (name === "" || email === "" || message === "") {
      alert("Mohon lengkapi semua field!");
      return;
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Mohon masukkan email yang valid!");
      return;
    }

    // Jika validasi berhasil, kirim ke WhatsApp
    sendToWhatsApp(name, email, message);

    // Reset form setelah berhasil dikirim
    contactForm.reset();

    // Tampilkan pesan konfirmasi
    alert("Terima kasih! Pesan Anda akan dikirim melalui WhatsApp.");
  });
}

// Fungsi untuk mengatur efek parallax dan navbar transparency
function setupScrollEffects() {
  // Event listener untuk scroll
  window.addEventListener("scroll", function () {
    // Mendapatkan posisi scroll
    const scrollTop = window.pageYOffset;

    // Mendapatkan elemen navbar
    const navbar = document.querySelector(".navbar");

    // Mengatur transparency navbar berdasarkan posisi scroll
    if (scrollTop > 50) {
      // Jika scroll lebih dari 50px, navbar menjadi lebih solid
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      // Jika di atas, navbar lebih transparan
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 1px 10px rgba(0, 0, 0, 0.05)";
    }
  });
}

// Fungsi untuk menambahkan animasi pada elemen saat muncul di viewport
function setupScrollAnimations() {
  // Membuat Intersection Observer untuk mendeteksi elemen yang masuk viewport
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        // Jika elemen masuk viewport, tambahkan class 'visible'
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1, // Trigger ketika 10% elemen terlihat
    }
  );

  // Mendapatkan semua elemen yang akan dianimasi
  const animatedElements = document.querySelectorAll(
    ".section-title, .section-subtitle, .about-text, .contact-info, .contact-form"
  );

  // Mengatur style awal dan observe setiap elemen
  animatedElements.forEach(function (element) {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
}

// Event listener yang dijalankan setelah DOM selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi semua fungsi utama
  typeText(); // Memulai typing animation
  setupMobileNavigation(); // Mengatur hamburger menu
  setupSmoothScrolling(); // Mengatur smooth scroll
  setupContactForm(); // Mengatur form contact
  setupScrollEffects(); // Mengatur efek scroll pada navbar
  setupScrollAnimations(); // Mengatur animasi scroll

  // Log untuk debugging (bisa dihapus di production)
  console.log("Website berhasil dimuat dan semua fungsi telah diinisialisasi!");
});
