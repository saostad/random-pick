<script lang="ts">
	import { locale } from '$i18n/i18n-svelte';
</script>

<div
	class="
  sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100
  bg-base-100 text-base-content
  "
>
	<nav class="navbar w-full">
		<div class="flex flex-1 md:gap-1 lg:gap-2">
			<span
				class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
				data-tip="Menu"
				><label
					aria-label="Open menu"
					for="drawer"
					class="btn btn-square btn-ghost drawer-button lg:hidden"
					><svg
						width="20"
						height="20"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					></label
				></span
			>
			<div class="flex items-center gap-2">
				<a
					href={`/${$locale}`}
					aria-current="page"
					aria-label="Homepage"
					class="flex-0 btn btn-ghost gap-1 px-2 md:gap-2"
					data-svelte-h="svelte-11qcss2"
					><svg
						class="h-6 w-6 md:h-8 md:w-8"
						width="32"
						height="32"
						viewBox="0 0 415 415"
						xmlns="http://www.w3.org/2000/svg"
						><rect x="82.5" y="290" width="250" height="125" rx="62.5" fill="#1AD1A5" /><circle
							cx="207.5"
							cy="135"
							r="130"
							fill="black"
							fill-opacity=".3"
						/><circle cx="207.5" cy="135" r="125" fill="white" /><circle
							cx="207.5"
							cy="135"
							r="56"
							fill="#FF9903"
						/></svg
					>
					<div class="font-title inline-flex text-lg md:text-2xl">
						<span class="lowercase">Random</span> <span class="uppercase text-[#1AD1A5]">Pick</span>
					</div></a
				>
			</div>
		</div>
		<div class="flex-0">
			<div title="Change Theme" class="dropdown dropdown-end">
				<div tabindex="-1" class="btn normal-case btn-ghost">
					<svg
						width="20"
						height="20"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="h-5 w-5 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
						/></svg
					> <span class="hidden font-normal md:inline">Theme</span>
					<svg
						width="12px"
						height="12px"
						class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 2048 2048"
						><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" /></svg
					>
				</div>
				<div
					class="dropdown-content bg-base-200 text-base-content rounded-box top-px max-h-96 w-56 overflow-y-auto shadow mt-16"
				>
					<div class="grid grid-cols-1 gap-3 p-3">
						<button
							class="outline-base-content overflow-hidden rounded-lg text-left"
							data-set-theme="light"
							data-act-class="[&amp;_svg]:visible"
							><div
								data-theme="light"
								class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
							>
								<div class="grid grid-cols-5 grid-rows-3">
									<div class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="invisible h-3 w-3 shrink-0"
											><path
												d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
											/></svg
										>
										<div class="flex-grow text-sm">light</div>
										<div
											class="flex h-full flex-shrink-0 flex-wrap gap-1"
											data-svelte-h="svelte-izuv7l"
										>
											<div class="bg-primary w-2 rounded" />
											<div class="bg-secondary w-2 rounded" />
											<div class="bg-accent w-2 rounded" />
											<div class="bg-neutral w-2 rounded" />
										</div>
									</div>
								</div>
							</div></button
						><button
							class="outline-base-content overflow-hidden rounded-lg text-left"
							data-set-theme="dark"
							data-act-class="[&amp;_svg]:visible"
							><div
								data-theme="dark"
								class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
							>
								<div class="grid grid-cols-5 grid-rows-3">
									<div class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="invisible h-3 w-3 shrink-0"
											><path
												d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
											/></svg
										>
										<div class="flex-grow text-sm">dark</div>
										<div
											class="flex h-full flex-shrink-0 flex-wrap gap-1"
											data-svelte-h="svelte-izuv7l"
										>
											<div class="bg-primary w-2 rounded" />
											<div class="bg-secondary w-2 rounded" />
											<div class="bg-accent w-2 rounded" />
											<div class="bg-neutral w-2 rounded" />
										</div>
									</div>
								</div>
							</div></button
						>
					</div>
				</div>
			</div>
			<div title="Change Language" class="dropdown dropdown-end">
				<div tabindex="-1" class="btn btn-ghost normal-case" data-svelte-h="svelte-16sc62l">
					<svg
						class="h-5 w-5 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 512 512"
						><path
							d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"
						/><path
							d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"
						/></svg
					>
					<svg
						width="12px"
						height="12px"
						class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 2048 2048"
						><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" /></svg
					>
				</div>
				<div
					class="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 w-56 overflow-y-auto shadow"
				>
					<ul class="menu menu-sm gap-1" tabindex="-1">
						<li>
							<button class="active"
								><img
									class="drop-shadow"
									loading="lazy"
									width="20"
									height="20"
									alt="English"
									src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg"
								/> English
							</button>
						</li>
						<li>
							<button
								><img
									class="drop-shadow"
									loading="lazy"
									width="20"
									height="20"
									alt="Español"
									src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ea-1f1f8.svg"
								/> Español
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</div>
