class QueueNode<T> {
    value: T;
    next: QueueNode<T> | null = null;
  
    constructor(value: T) {
      this.value = value;
    }
  }
  
  export class Queue<T> {
    private head: QueueNode<T> | null = null;
    private tail: QueueNode<T> | null = null;
    private size = 0;
  
    enqueue(value: T): void {
      const newNode = new QueueNode(value);
      
      if (this.tail) {
        this.tail.next = newNode;
      } else {
        this.head = newNode;
      }
      
      this.tail = newNode;
      this.size++;
    }
  
    dequeue(): T | undefined {
      if (!this.head) return undefined;
      
      const removedValue = this.head.value;
      this.head = this.head.next;
      
      if (!this.head) {
        this.tail = null;
      }
      
      this.size--;
      return removedValue;
    }
  
    peek(): T | undefined {
      return this.head?.value;
    }
  
    getSize(): number {
      return this.size;
    }
  
    isEmpty(): boolean {
      return this.size === 0;
    }
  
    clear(): void {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }
  }