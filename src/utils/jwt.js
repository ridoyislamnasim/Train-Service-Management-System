import Jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const generateAccessToken = (payload) => {
  return Jwt.sign(payload, config.jwtAccessSecretKey, {
    expiresIn: '1d',
  });
};

export const generateRefreshToken = (payload) => {
  return Jwt.sign(payload, config.jwtRefreshSecretKey, {
    expiresIn: '365d',
  });
};

export const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, config.jwtAccessSecretKey, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};

export const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, config.jwtRefreshSecretKey, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};
