import React from "react";

const EmbeddedMap = () => {
  const embedCode = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d419.2549619364104!2d-68.83173168349765!3d-32.79120672339586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e079e3aa9da4b%3A0x6845abf4739d9d27!2sCatacpol%20las%20heras!5e0!3m2!1sen!2sar!4v1688496313149!5m2!1sen!2sar"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

  return (
    <div
      className="map-container"
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
};

export default EmbeddedMap;
