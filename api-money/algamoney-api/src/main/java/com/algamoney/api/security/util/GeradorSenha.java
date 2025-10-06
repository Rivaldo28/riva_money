package com.algamoney.api.security.util;

import java.security.SecureRandom;

public class GeradorSenha {

    private static final String CARACTERES = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/~`¿¡\\";
    private static final int TAMANHO_SENHA = 20;

    public static void main(String[] args) {
        System.out.println("Senha aleatória: " + gerarSenhaAleatoria());
    }

    public static String gerarSenhaAleatoria() {
        SecureRandom random = new SecureRandom();
        StringBuilder senha = new StringBuilder(TAMANHO_SENHA);

        for (int i = 0; i < TAMANHO_SENHA; i++) {
            int index = random.nextInt(CARACTERES.length());
            senha.append(CARACTERES.charAt(index));
        }

        return senha.toString();
    }
}
