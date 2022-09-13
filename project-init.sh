read -p "Enter the extension name: " name
read -p "Enter the package name: " package
read -p "Enter the description: " desc
read -p "Enter author name: " author

replace_in() {
  for filename in $(find ./$1 -maxdepth ${3:-999} -name "$2"); do
    sed -i "s/<EXTENSION_NAME_HERE>/$name/" $filename
    sed -i "s/<EXTENSION_DESCRIPTION_HERE>/$desc/" $filename
    sed -i "s/<package-name-here>/$package/" $filename
    sed -i "s/<AUTHOR_NAME_HERE>/$author/" $filename
  done
}

if [[ $name != "" ]]; then
  replace_in "src" "*.*"
  replace_in "dist" "*.*"
  replace_in "" "package.json" 1
  replace_in "" "README.md" 1
  replace_in "" "LICENSE" 1
  echo "Replaced fields in relevant files with provided information"
else
  echo 'A name must be provided'
fi

