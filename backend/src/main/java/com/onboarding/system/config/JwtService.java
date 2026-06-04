package com.onboarding.system.config;

import com.onboarding.system.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Service
@RequiredArgsConstructor
public class JwtService
{
    private final JwtProperties jwtProperties;

    private SecretKey getSigningKey()
    {
        byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecretKey());

        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAccessToken(User user)
    {
        Map<String,Object> claims = new HashMap<>();

        claims.put("userId", user.getId().toString());
        claims.put("role", user.getRole().name());

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+jwtProperties.getAccessTokenExpiration()))
                .signWith(getSigningKey())
                .compact();
    }
    public String extractEmail(String token)
    {
        return extractClaim(token, Claims::getSubject);
    }
    public String extractUserId(String token)
    {
        return extractClaim(token,(Claims claims) -> claims.get("userId", String.class));
    }
    public String extractRole(String token)
    {
        return extractClaim(token,(Claims claims) -> claims.get("role",String.class));
    }

    public <T> T extractClaim(String token , Function<Claims,T> resolver)
    {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }
    private Claims extractAllClaims(String token)
    {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    private Date extractExpiration(String token)
    {
        return extractClaim(token,Claims::getExpiration);
    }

    public boolean isTokenExpired(String token)
    {
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid(
            String token,
            User user)
    {
        String tokenUserId = extractUserId(token);

        return tokenUserId.equals(
                user.getId().toString()
        )
                && !isTokenExpired(token);
    }


}
