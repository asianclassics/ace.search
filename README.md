# Asian Classics Explorer (ACE) 1.0 (SEARCH)

## Sub-Modules

`server` is a git submodule

**Note:**

-   `git submodule add server`, when you first add as submodule
-   `cd server`, work as if in repo, then commit and push (what branch are you working from?)
-   within parent, `git add server` <-- and this will update reference to server submodule

-   to update submodule to current master
    -- `cd server`
    -- `git checkout master` (probably already on master)
    -- `git pull`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

-   test TIBTEXT full text for all the results from '"STONG TSUL THA""
