Feature: Login as user

Scenario: Login as an existing user
  Given An registered user
  When The user tries to login
  Then A welcome message should be shown
