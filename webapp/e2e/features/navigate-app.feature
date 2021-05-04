Feature: Navigating the application

Scenario: The user loads the webpage
  Given An unregistered user
  When The user enters the webapp
  Then A message should be shown in the screen

Scenario: The user tries to access views where login is needed: Map
  Given An unregistered user
  When The user tries to access the map
  Then A message should be shown in the screen

Scenario: The user tries to access views where login is needed: Manage Friends
  Given An unregistered user
  When The user tries to access manage friends
  Then A message should be shown in the screen

Scenario: The user tries to access views where login is not needed: About us
  Given An unregistered user
  When The user tries to access about us
  Then The about us page should appear
