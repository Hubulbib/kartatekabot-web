import { SocialNetworkType } from "../entities/types";
import InstagramIcon from "../assets/instagram.svg";
import TelegramIcon from "../assets/telegram.svg";
import VKIcon from "../assets/vk.svg";
import MAXIcon from "../assets/max.svg";
import ChatImage from "../assets/chat.svg";

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const getSocialNetworkIcon = (type: SocialNetworkType) => {
  switch (type) {
    case SocialNetworkType.INSTAGRAM:
      return InstagramIcon;
    case SocialNetworkType.TELEGRAM:
      return TelegramIcon;
    case SocialNetworkType.VK:
      return VKIcon;
    case SocialNetworkType.MAX:
      return MAXIcon;
    default:
      return ChatImage;
  }
};

export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  const match = digits.match(/^(\d)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
  if (!match) return value;

  return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`.replace(
    /[-() ]+$/,
    ""
  );
};
