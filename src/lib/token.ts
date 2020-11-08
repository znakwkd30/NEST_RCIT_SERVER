import * as jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET: secret } = process.env;

/**
 * @description 토큰 발급
 * @param {String} id
 * @param {String} permission
 */
exports.createToken = async (id, permission) => {
    const payload = {
        id,
        permission
    };
    
    const option = {
        expiresIn: '60 days', // 유효일자
        issuer: 'student', // 발급자
        subject: 'token', // 토큰제목
    };

    try {
        const result = await jsonwebtoken.sign(payload, secret, option);
        return result;
    } catch (error) {
        console.log(`[TOKEN] 토큰 발급 중 오류`);
    }
}

/**
 * @description 리프레시 토큰 발급
 * @param {String} id
 * @param {String} permission
 */
exports.createRefreshToken = async (id, permission) => {
    const payload = {
        id,
        permission,
    };

    const option = {
        expiresIn: '30 days', // 유효일자
        issuer: 'DGSW.HS.KR', // 발급자
        subject: 'refreshToken', // 토근제목
    };

    try {
        const result = await jsonwebtoken.sign(payload, secret, option);
        return result;
    } catch (error) {
        console.log(`[TOKEN] Refresh Token 발급 중 오류`);
    }
}

/**
 * @description 토큰 검증
 * @param {String} id
 */
exports.verifyToken = async (token) => {
    try {
        const result = await jsonwebtoken.verify(token, secret);
        return result;
    } catch (error) {
        console.log(`[TOKEN] 토큰 검증 오류`);
    }
}