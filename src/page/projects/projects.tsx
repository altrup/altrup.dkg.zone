import transitionStyles from '../transitions.module.css';

const codingSection = {
	title: "Coding Projects",
	projects: [
		{ 
			name: "Schmek", description: "A twist on the classic snake game, where players can upgrade abilities and create simple combos", 
			links: [{text: "Demo", href: "https://schmek.dkg.zone"}, {text: "Code", href: "https://github.com/EricL521/Schmek"}], 
			image: {preview: "/images/svg/projects/Schmek.svg", full: "/images/svg/projects/Schmek.svg", 
				alt: "A sample frame of a Schmek game", aspectRatio: 1500/1200, height: 100}
		},
		{
			name: "RingVC", description: "A discord bot that allows you to easily ping people to join you in a Discord server voice chat", 
			links: [{text: "Code", href: "https://github.com/EricL521/RingVC"}]
		},
		{
			name: "Rotating Arrow Game", description: "An online implementation of an interesting puzzle game I found in a mobile app", 
			links: [{text: "Demo", href: "https://ericl521.github.io/Rotating-Arrow-Game"}, {text: "Code", href: "https://github.com/EricL521/Rotating-Arrow-Game"}]
		},
		{
			name: "ParticleJS", description: "In my opinion, satisfying, but very ineffecient particle simulation. Warning: flash bang for dark mode users", 
			links: [{text: "Demo", href: "https://ericl521.github.io/particlejs/test/test.html"}, {text: "Code", href: "https://github.com/EricL521/particlejs"}]
		},
		{
			name: "Soldier Tycoon", description: "One of my first games! A one file monstrocity where you defend a castle from raiders. Also a flash bang", 
			links: [{text: "Demo", href: "https://ericl521.github.io/Soldier-Tycoon"}, {text: "Code", href: "https://github.com/EricL521/Soldier-Tycoon"}]
		}
	]
};

const physicalProjectsSection = {
	title: "Physical Projects",
	description: "At least what I have photos of",
	projects: [
		{
			name: "Svejk Dice", description: "Custom wood dice made with a CNC machine and a custom jig. Designed using Inkscape because I like open source stuff", 
			image: {preview: "/images/preview/projects/svejk-dice.jpg", full: "/images/full/projects/svejk-dice.jpg", 
				alt: "A die with Svejk on one face", aspectRatio: 2449/2576, height: 200}
		},
		{
			name: "Framework 16 GPU Case", description: "A 3d-printed case for my Framework 16 GPU and Expansion Bay Shell when not in use", 
			links: [{text: "STL Models", href: "https://github.com/EricL521/Framework-16-GPU-Case"}],
			image: {preview: "/images/preview/projects/framework-gpu-case.jpg", full: "/images/full/projects/framework-gpu-case.jpg", 
				alt: "A Framework 16 GPU with a case over it", aspectRatio: 2763/2620, height: 200}
		}
	]
};

const crossViewSection = {
	title: "Cross View Images",
	description: <>
		{"Cross your eyes and try to make the images overlap! For more info about cross view and a tutorial, check out "}
		<a href="https://www.reddit.com/r/CrossView/wiki/index/" target="_blank" 
		className={[transitionStyles["interactive"], transitionStyles["clickable"], transitionStyles["rounded-square"]].join(' ')}>this</a>{" Reddit post"}
	</>,
	imageScroller: {
		height: 200,
		images: [
			{preview: "/images/preview/crossview/nighttime-street.jpg", full: "/images/full/crossview/nighttime-street.jpg", alt: "Cross view image of a street at night", aspectRatio: 5989/4388},
			{preview: "/images/preview/crossview/water-reflection.jpg", full: "/images/full/crossview/water-reflection.jpg", alt: "Cross view image of some lights reflecting in water", aspectRatio: 6171/4163},
			{preview: "/images/preview/crossview/fish-pond.jpg", full: "/images/full/crossview/fish-pond.jpg", alt: "Cross view image of some fish in a pond", aspectRatio: 2454/1721},
			{preview: "/images/preview/crossview/bag-milk.jpg", full: "/images/full/crossview/bag-milk.jpg", alt: "Cross view image of a bag of milk", aspectRatio: 5516/4252},
			{preview: "/images/preview/crossview/burger.jpg", full: "/images/full/crossview/burger.jpg", alt: "Cross view image of a burger I got at a restaurant", aspectRatio: 4834/4292},
			{preview: "/images/preview/crossview/svejk-dice.jpg", full: "/images/full/crossview/svejk-dice.jpg", alt: "Cross view image of a die with Svejk on one face", aspectRatio: 5105/4166},
			{preview: "/images/preview/crossview/framework-gpu-case.jpg", full: "/images/full/crossview/framework-gpu-case.jpg", alt: "Cross view image of a Framework 16 GPU with a case over it", aspectRatio: 5673/4296}
		]
	}
}

export default [codingSection, physicalProjectsSection, crossViewSection];