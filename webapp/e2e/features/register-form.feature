Feature: Login as user

Scenario: Login as an existing user
  Given An registered user
  When The user tries to login
  Then The user is redirected to a login from the provider

Scenario: Login as a new user
  Given An registered user
  When The user wants to get a pod
  Then The user is redirected to a register from the provider
