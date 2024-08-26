#!/bin/bash

gcloud projects create life-in-weeks-prod
gcloud config set project life-in-weeks-prod

# configure Google log in:
# https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=web#google-pre-built-configuration
# https://console.cloud.google.com/apis/credentials/consent?project=life-in-weeks-prod
# https://console.cloud.google.com/apis/credentials?project=life-in-weeks-prod
# * click 'Create Credentials'
# * select 'OAuth client ID'
# * select 'Web application'
# * add these authorized JavaScript origins:
#   * http://localhost
#   * http://127.0.0.1
#   * https://vercel.app
#   * https://weeksin.life
# * add these authorized redirect URIs:
#   * http://127.0.0.1:54321/auth/v1/callback
#   * http://localhost:54321/auth/v1/callback
#   * https://wzmbtcpnjweqsqiubvii.supabase.co/auth/v1/callback
#   * https://mbauxwpjmmlvbojestpa.supabase.co/auth/v1/callback

# configure supabase providers with client id and secret from above: https://supabase.com/dashboard/project/mbauxwpjmmlvbojestpa/auth/providers
# configure redirect urls: https://supabase.com/dashboard/project/mbauxwpjmmlvbojestpa/auth/url-configuration
# for staging:
# * https://*-jonny-langefelds-projects.vercel.app/**
# for prod:
# * https://life-in-weeks-xi.vercel.app/**
# * https://weeksin.life/**
