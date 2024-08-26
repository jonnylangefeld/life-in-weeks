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
# configure supabase providers: https://supabase.com/dashboard/project/mbauxwpjmmlvbojestpa/auth/providers
# configure redirect urls: https://supabase.com/dashboard/project/mbauxwpjmmlvbojestpa/auth/url-configuration
