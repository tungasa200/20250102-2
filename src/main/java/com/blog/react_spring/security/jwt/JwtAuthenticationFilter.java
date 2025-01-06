package com.blog.react_spring.security.jwt;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;

    @Value("${jwt.header}") private String HEADER_STRING;
    @Value("${jwt.preFix}") private String TOKEN_PREFIX;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Thread currentThread = Thread.currentThread();
        log.info("Current thread: " + currentThread);
        String header = request.getHeader(HEADER_STRING);
        String username = null;
        String authToken = null;

        if(header != null && header.startsWith(TOKEN_PREFIX)) {
            authToken = header.replace(TOKEN_PREFIX," ");
            try{
                this.jwtTokenUtil.getUsernameFromToken(authToken);
            }catch (IllegalArgumentException ex){
                log.info("사용자 ID를 얻는데 실패하였습니다.");
            }catch (ExpiredJwtException ex){
                log.info("만료된 토큰입니다.");
            }catch (MalformedJwtException ex){
                log.info("JWT 토큰을 얻을 수 없습니다.");
            }catch (Exception e){
                e.printStackTrace();
            }
        }else{
            log.info("JWT는 Bearer로 시작하지않습니다.");
        }

        if((username != null) && (SecurityContextHolder.getContext().getAuthentication() == null)) {
            log.info(SecurityContextHolder.getContext().getAuthentication().getName());
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if(this.jwtTokenUtil.validateToken(authToken, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                log.info("인증된 사용자" + username + "보안 컨텍스트 설정(security context)");
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }else {
                log.info("잘못된 JWT 입니다.");
            }
        }else {
            log.info("사용자 이름이 null이거나, context가 null이 아닙니다.");
        }
        filterChain.doFilter(request, response);
    }
}
