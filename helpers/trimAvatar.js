import Jimp from "jimp";

const trimAvatar = (avatarPath) => {
  Jimp.read(avatarPath)
    .then((avatar) => avatar.cover(250, 250).quality(80).write(avatarPath))
    .catch((err) => {
      console.error(err);
    });
};

export default trimAvatar;
