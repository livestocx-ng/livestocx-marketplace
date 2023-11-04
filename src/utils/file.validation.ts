export function isFileSizeValid(file: File): boolean {
	const maxSizeImageKB = 500 * 1024; // 500KB
	const maxSizeVideoMB = 10000 * 1024; // 10MB in KB

	const fileSizeKB = file.size; // Convert file size to KB

	if (file.type.startsWith('image/') && fileSizeKB > maxSizeImageKB) {
		return false; // Image size exceeds the limit
	} else if (file.type.startsWith('video/') && fileSizeKB > maxSizeVideoMB) {
		return false; // Video size exceeds the limit
	}

	return true; // File size is valid
}

