# UP-114 — My tasks page

As an Upticked member
I want one page showing every task assigned to me
So that I can plan my day without opening each of my lists in turn

## Acceptance criteria

### Features

```gherkin
Scenario: Seeing my tasks from across my lists
  Given I am assigned tasks on more than one list
  When I open My tasks from the navigation
  Then I see the tasks assigned to me
  And each task shows the name of the list it belongs to

Scenario: Seeing what is due when
  Given I am assigned a task that was due yesterday
  And I am assigned a task that is due today
  When I open My tasks
  Then the task that was due yesterday appears under "Overdue"
  And the task that is due today appears under "Today"

Scenario: Narrowing to one status
  Given I am on My tasks
  When I filter to "In progress"
  Then I see only my in-progress tasks
  And reloading the page keeps that filter applied
```

### Functional requirements

* My tasks appears in the sidebar navigation
* My tasks shows the tasks assigned to the signed-in member
* Tasks are grouped under Overdue, Today, This week, Later, and No due date
* "This week" means due within the next seven days, not counting today
* A group with no tasks is not rendered
* Tasks within a group are ordered by due date, soonest first
* Each task shows its title, the name of the list it belongs to, its due date and
  its priority
* The status filter offers all statuses plus one entry per status, and the
  selected status is held in the page URL
* The page shows an empty state when no task matches
