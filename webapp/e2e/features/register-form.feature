Feature: Registering a new user

Scenario: The user tries to access views where login is needed: Map
  Given An unregistered user
  When The user tries to access the map
  Then A message should be shown in the screen

Scenario: The user tries to access views where login is needed: Manage Friends
  Given An unregistered user
  When The user tries to access the map
  Then A message should be shown in the screen