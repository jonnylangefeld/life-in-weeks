#!/bin/bash

gcloud projects create life-in-weeks-dev
gcloud config set project life-in-weeks-dev

gcloud projects create life-in-weeks-staging
gcloud config set project life-in-weeks-staging

# configure Google log in:
# https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=web#google-pre-built-configuration
