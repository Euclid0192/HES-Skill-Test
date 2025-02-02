# 1. Access to your project (zip, dropbox, github page... etc)
https://github.com/Euclid0192/HES-Skill-Test

# 2. Time spent on the project
I spent around 10 hours on the project, much of which was just debugging because the node and react version this codebase uses is older than those I have used before.

# 3. Explanation of work completed
Overall, I have implemented a basic homepage with two buttons to navigate to the two required pages, as well as a navigation bar on top. Other than that are the reviews
page with full functionality (search by title, filter by MPAA, date, critics pick) and critics page that shows every critic along with their number of reviews written 
and critics pick. 
## HomePage
![image](https://github.com/user-attachments/assets/f3466c9e-d4aa-4719-9991-3b95a3d25951)
This is just a very basic homepage as described above. 

## Reviews Page
![image](https://github.com/user-attachments/assets/8d2074cd-88d5-4d4a-b6cd-a8fe0d042930)
![image](https://github.com/user-attachments/assets/d545d55b-1bbb-4f01-98b8-802cc8d33c40)
![image](https://github.com/user-attachments/assets/05fc6162-16de-4fa6-ad1f-84490edd9c0a)
The reviews page initially shows 20 reviews, with the option to load more reviews at the end of the  page, which users can use to load 10 more reviews until the number of 
displayed reviews reaches 50 (maximum). To show all the reviews in the static database, I have implemented pagination functionality: 20 (max 50) reviews might be displayed
on the screen at the same time, but users can move to the next page or previous page to see more reviews. 
![image](https://github.com/user-attachments/assets/7b58908a-5e09-494c-a7d5-653886fd2606)
The search and filter features are also implemented on-demand (while users are typing), and if no reviews are found a message of "No review found" will be shown to 
the users. 
![image](https://github.com/user-attachments/assets/df22284a-6e0a-4288-9ce9-1f8382a87a46)
When users click on a review, a small modal(window) will show up, detailing information about this review. And when the users close this modal, all the filters or 
searches being applied still hold.

That's all for the reviews page. Let's move to the Critics Page.

## Critics Page
![image](https://github.com/user-attachments/assets/38a0dd87-9912-4034-97b1-166514efeea1)
I implemented the Critics Page in quite the same structure as the Reviews Page, with each item (critic) as a card. Each card shows the name of the critic, the number 
of reviews written, and the critic's pick, as well as a bio or image (if available). If not available, no image will be shown, and the bio part is replaced by a message
"No information about this critic" (as shown in the first card). 
![image](https://github.com/user-attachments/assets/ebd9a23a-fa34-4edb-b565-bfe9249df4f6)
If every media and resource is available, a card will show all of a critic's information (as shown above).

# 4. Explanation of work you didn't get to and what you would do
Although I think the required functionalities look quite good to me, there are still some other things I think I could do more. 
## 4.1 Specified number of reviews showed
What I'm currently doing is loading 10 more reviews each time the users click on the button to change the number of reviews displayed. In the future, I can implement
an input where users can type in the exact number of reviews they want to be displayed and the web will respond accordingly.
## 4.2 Maybe more reusability
Since the time is limited, I wasn't able to create a Card container for items in both reviews and critics pages. You can see that on both pages, one item is the same
card with the same style. The list structure is also the same across the two pages. With that in mind, I could've created a single Item.jsx as a container for content
on both pages, as well as a List.jsx as a list structure on both pages.
## 4.3 Use 3rd party libraries/frameworks and update newer versions of technologies. 
Initially, for the Card part, I was going to use ChakraUI (a React library with built-in components) so that I don't have to implement the CSS again, and that would 
also make the design consistent throughout the website. However, it seems like the version of node, webpack, and react is not compatible with the library. I think if
possible, I can try to update everything (node version, react version, etc.) to the latest version: not only does this allow a wide range of 3rd party libraries to be
used to increase development efficiency, but it also provides better maintenance, community support, and protection.
